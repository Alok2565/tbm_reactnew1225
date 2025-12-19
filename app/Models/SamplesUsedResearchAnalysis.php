<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SamplesUsedResearchAnalysis extends Model
{
    use HasFactory;

    protected $table = 'samples_used_research_analyses';
    protected $fillable = ['name', 'value', 'status'];
}
