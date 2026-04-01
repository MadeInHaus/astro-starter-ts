import { confirm } from '@inquirer/prompts';
import sh from 'shelljs';
import path from 'path';

const run = async () => {
    const items = [
        {
            path: path.resolve(process.cwd(), '.astro'),
            label: '.astro folder',
            test: '-d',
        },
        {
            path: path.resolve(process.cwd(), 'dist'),
            label: 'dist folder',
            test: '-d',
        },
        {
            path: path.resolve(process.cwd(), 'node_modules'),
            label: 'node_modules folder',
            test: '-d',
        },
        {
            path: path.resolve(process.cwd(), 'package-lock.json'),
            label: 'package-lock.json file',
            test: '-f',
        },
        {
            path: path.resolve(process.cwd(), 'yarn.lock'),
            label: 'yarn.lock file',
            test: '-f',
        },
    ];

    const toRemove = [];

    for (const item of items) {
        const exists = sh.test(item.test, item.path);
        if (!exists) continue;

        const remove = await confirm({
            message: `Remove ${item.label}?`,
            default: true,
        });

        if (remove) {
            toRemove.push(item);
        }
    }

    if (toRemove.length === 0) {
        console.log('\nNothing to clean up.');
        return;
    }

    for (const item of toRemove) {
        if (item.test === '-d') {
            sh.rm('-rf', item.path);
        } else {
            sh.rm(item.path);
        }
    }
};

run();
