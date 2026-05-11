"use client";

import * as React from "react";

import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    selected: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items",
}: MultiSelectProps) {

    const [open, setOpen] = React.useState(false);

    const toggleOption = (value: string) => {

        if (selected.includes(value)) {
            onChange(
                selected.filter((item) => item !== value)
            );
        } else {
            onChange([...selected, value]);
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild>

                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between min-h-11 h-auto"
                >

                    <div className="flex gap-1 flex-wrap">

                        {selected.length > 0 ? (
                            selected.map((value) => {

                                const option = options.find(
                                    (o) => o.value === value
                                );

                                return (
                                    <Badge
                                        key={value}
                                        variant="secondary"
                                        className="flex items-center gap-1"
                                    >
                                        {option?.label}

                                        <span
                                            onClick={(e) => {
                                                e.stopPropagation();

                                                toggleOption(value);
                                            }}
                                        >
                                            <X className="h-3 w-3" />
                                        </span>

                                    </Badge>
                                );
                            })
                        ) : (
                            <span className="text-muted-foreground">
                                {placeholder}
                            </span>
                        )}

                    </div>

                    <ChevronsUpDown className="h-4 w-4 opacity-50" />

                </Button>

            </PopoverTrigger>

            <PopoverContent
                className="w-full p-0"
                align="start"
            >

                <Command>

                    <CommandInput placeholder="Search..." />

                    <CommandEmpty>
                        No results found.
                    </CommandEmpty>

                    <CommandGroup>

                        {options.map((option) => (

                            <CommandItem
                                key={option.value}
                                onSelect={() =>
                                    toggleOption(option.value)
                                }
                            >

                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected.includes(option.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />

                                {option.label}

                            </CommandItem>

                        ))}

                    </CommandGroup>

                </Command>

            </PopoverContent>

        </Popover>
    );
}