import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUp, MoreHorizontal, Plus } from "lucide-react";

export const PromptInputArea = () => {
	return (
		<div className="mb-8 w-full rounded-xl border border-border bg-card">
			{/* Top section with textarea and action buttons */}
			<div className="p-3 sm:p-4">
				<textarea
					placeholder="What do want to practice today..."
					className="min-h-[80px] w-full resize-none border-0 bg-transparent p-2 text-base placeholder-muted-foreground focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
					rows={3}
				/>
				{/* Action buttons are now in normal flow, below the textarea */}
				<div className="mt-3 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Select defaultValue="mix">
							<SelectTrigger className="text-sm shadow-transparent border-transparent">
								<span className="text-muted-foreground text-sm hidden sm:inline">
									Difficulty:
								</span>{" "}
								<SelectValue placeholder="Difficulty" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem className="text-sm" value="mix">
									Mix
								</SelectItem>
								<SelectItem className="text-sm" value="easy">
									Easy
								</SelectItem>
								<SelectItem className="text-sm" value="medium">
									Medium
								</SelectItem>
								<SelectItem className="text-sm" value="hard">
									Hard
								</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue="10">
							<SelectTrigger className="text-sm shadow-transparent border-transparent">
								<span className="text-muted-foreground text-sm hidden sm:inline">
									Number of Questions:
								</span>{" "}
								<SelectValue placeholder="Number of Questions" />
							</SelectTrigger>
							<SelectContent>
								<div className="grid grid-cols-2 gap-2 p-2">
									<SelectItem className="text-sm" value="5">
										5
									</SelectItem>
									<SelectItem className="text-sm" value="10">
										10
									</SelectItem>
									<SelectItem className="text-sm" value="15">
										15
									</SelectItem>
									<SelectItem className="text-sm" value="30">
										30
									</SelectItem>
								</div>
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-1 sm:gap-2">
						<Button
							variant="default" // Primary style for send
							size="icon"
							className="rounded-full"
						>
							<ArrowUp className="h-5 w-5" />
							<span className="sr-only">Send</span>
						</Button>
					</div>
				</div>
			</div>
			{/* Bottom section with Upload Files */}
			<div className="border-t border-border p-3 sm:p-4">
				<div className="flex items-center justify-between">
					<Button
						variant="ghost"
						size="sm"
						className="gap-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
					>
						<Plus className="h-4 w-4" />
						Upload Files or Add Web URLs
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full text-muted-foreground hover:bg-accent hover:text-accent-foreground"
					>
						<MoreHorizontal className="h-5 w-5" />
						<span className="sr-only">More options</span>
					</Button>
				</div>
			</div>
		</div>
	);
};
