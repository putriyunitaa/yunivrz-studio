<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    private $defaults = [
        'whatsapp_number' => '6285651999928',
        'linkedin_url' => 'https://www.linkedin.com/in/ptryntt',
        'github_url' => 'https://github.com/putriyunitaa',
        'instagram_developer' => 'https://www.instagram.com/ptryntaa_/',
        'instagram_business' => 'https://www.instagram.com/heyyunivrz_/',
        'email' => 'yunivrzstudio@gmail.com',
    ];

    /**
     * Get all public settings.
     */
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();
        $merged = array_merge($this->defaults, $settings);

        return response()->json($merged);
    }

    /**
     * Update settings.
     */
    public function update(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            if ($value !== null) {
                Setting::set($key, (string) $value);
            }
        }

        $settings = Setting::all()->pluck('value', 'key')->toArray();
        $merged = array_merge($this->defaults, $settings);

        return response()->json([
            'message' => 'Pengaturan studio berhasil diperbarui',
            'data' => $merged
        ]);
    }
}
