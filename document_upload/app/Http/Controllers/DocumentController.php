<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\IOFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'document' => 'required|mimes:pdf,docx|max:2048',
            'content' => 'nullable|string',
        ]);

        $file = $request->file('document');
        // $name = $file->getClientOriginalName();
        $name = Str::uuid()->toString() . '_' . time() . '.' . $file->getClientOriginalExtension();

        $path = $file->storeAs('documents', $name);



        if ($file->getClientOriginalExtension() === 'pdf') {
            $pdfParser = new \Smalot\PdfParser\Parser();
            $pdfParser->parseFile(Storage::path($path));
        } elseif ($file->getClientOriginalExtension() === 'docx') {
            IOFactory::load(Storage::path($path));
        }
        $content = $request->input('content');
        // Save document details to database
        Document::create([
            'name' => $name,
            'content' => $content,
        ]);

        return response()->json(['message' => 'Document uploaded successfully'], 200);
    }

    public function list()
    {
        $documents = Document::all();
        return response()->json($documents);
    }
}
