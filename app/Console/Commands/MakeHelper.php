<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeHelper extends Command
{
    // artisan command name
    protected $signature = 'make:helper {name}';

    // description
    protected $description = 'Create a custom helper file inside app/Helpers';

    public function handle()
    {
        $name = $this->argument('name');

        $directory = app_path('Helpers');
        $filePath = $directory . '/' . $name . '.php';

        // Create Helpers folder if it does not exist
        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        // If file already exists
        if (File::exists($filePath)) {
            $this->error("Helper {$name}.php already exists!");
            return Command::FAILURE;
        }

        // Helper file template
        $template = <<<PHP
<?php

if (! function_exists('{$name}')) {
    function {$name}()
    {
        // Write your helper logic here
    }
}
PHP;

        // Save the file
        File::put($filePath, $template);

        $this->info("Helper file created: app/Helpers/{$name}.php");

        return Command::SUCCESS;
    }
}
