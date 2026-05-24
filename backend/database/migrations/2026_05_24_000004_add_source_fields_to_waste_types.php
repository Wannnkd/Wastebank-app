<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('waste_types', function (Blueprint $table) {
            $table->string('external_id')->nullable()->after('id');
            $table->string('external_code')->nullable()->after('external_id');
            $table->string('source_name')->nullable()->after('external_code');
            $table->string('source_url')->nullable()->after('source_name');
            $table->timestamp('source_updated_at')->nullable()->after('source_url');
        });
    }

    public function down(): void
    {
        Schema::table('waste_types', function (Blueprint $table) {
            $table->dropColumn([
                'external_id',
                'external_code',
                'source_name',
                'source_url',
                'source_updated_at',
            ]);
        });
    }
};
