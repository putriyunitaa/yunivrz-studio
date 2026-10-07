<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Project;
use Illuminate\Support\Str;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Invoice::with(['project.client']);

        // Jika client, hanya tampilkan tagihannya
        if ($request->user() && $request->user()->role->name === 'client') {
            $query->whereHas('project', function($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            });
        }

        $invoices = $query->orderBy('due_date', 'asc')->get();

        return response()->json($invoices);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'type' => 'required|in:dp,installment,full_payment',
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
        ]);

        // Generate unique invoice number
        $invNumber = 'INV-' . strtoupper(Str::random(6));
        while (Invoice::where('invoice_number', $invNumber)->exists()) {
            $invNumber = 'INV-' . strtoupper(Str::random(6));
        }

        $invoice = Invoice::create([
            'project_id' => $request->project_id,
            'invoice_number' => $invNumber,
            'type' => $request->type,
            'amount' => $request->amount,
            'status' => 'unpaid',
            'due_date' => $request->due_date,
            'notes' => $request->notes,
        ]);

        return response()->json($invoice->load('project'), 201);
    }

    public function show(string $id, Request $request)
    {
        $invoice = Invoice::with(['project.client'])->findOrFail($id);

        if ($request->user() && $request->user()->role->name === 'client') {
            if ($invoice->project->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }
        }

        return response()->json($invoice);
    }

    public function update(Request $request, string $id)
    {
        $invoice = Invoice::findOrFail($id);

        $request->validate([
            'status' => 'sometimes|required|in:unpaid,paid,overdue,cancelled',
            'payment_method' => 'nullable|string|max:50',
            'payment_proof' => 'nullable|string',
            'notes' => 'nullable|string',
            'amount' => 'sometimes|numeric',
        ]);

        if ($request->has('status') && $request->status === 'paid' && !$invoice->paid_at) {
            $request->merge(['paid_at' => now()]);
        }

        $invoice->update($request->all());

        return response()->json($invoice->load('project'));
    }

    public function destroy(string $id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully']);
    }
}
