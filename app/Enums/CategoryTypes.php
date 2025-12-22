<?php

namespace App\Enums;

enum CategoryTypes: string
{
    case CARTRIDGE = 'cartridge';
    case TUTORIAL = 'tutorial';
    case BLOGS = 'blogs';
    case CORE = 'core';
    case APEX = 'apex';
}
