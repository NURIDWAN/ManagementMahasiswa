"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

interface AlgorithmControlsProps {
    onSort: (algorithm: string) => void;
    onSearch: (algorithm: string, query: string) => void;
    executionTime: number | null;
}

export function AlgorithmControls({ onSort, onSearch, executionTime }: AlgorithmControlsProps) {
    const [sortAlgo, setSortAlgo] = useState("insertion");
    const [searchAlgo, setSearchAlgo] = useState("linear");

    const handleSortChange = (value: string) => {
        setSortAlgo(value);
        onSort(value);
    };

    const handleSearchChange = (value: string) => {
        setSearchAlgo(value);
        // We don't trigger search here immediately, it's triggered by the search input in the parent
        // But we need to inform parent about the algo change
        onSearch(value, "");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Settings2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-black dark:text-white">
                <DialogHeader>
                    <DialogTitle className="text-black dark:text-white">Algorithm Settings</DialogTitle>
                    <DialogDescription>
                        Select algorithms for sorting and searching.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="sort" className="text-right">
                            Sort
                        </Label>
                        <Select value={sortAlgo} onValueChange={handleSortChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select sort algorithm" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                                <SelectItem value="insertion">Insertion Sort</SelectItem>
                                <SelectItem value="selection">Selection Sort</SelectItem>
                                <SelectItem value="bubble">Bubble Sort</SelectItem>
                                <SelectItem value="merge">Merge Sort</SelectItem>
                                <SelectItem value="shell">Shell Sort</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="search" className="text-right">
                            Search
                        </Label>
                        <Select value={searchAlgo} onValueChange={handleSearchChange}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select search algorithm" />
                            </SelectTrigger>
                            <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                                <SelectItem value="linear">Linear Search</SelectItem>
                                <SelectItem value="sequential">Sequential Search</SelectItem>
                                <SelectItem value="binary">Binary Search (ID only)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {executionTime !== null && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Last Run</Label>
                            <div className="col-span-3 font-mono text-sm">
                                {executionTime.toFixed(4)} ms
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
