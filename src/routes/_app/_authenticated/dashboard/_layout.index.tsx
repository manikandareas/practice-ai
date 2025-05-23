import { HeaderConfiguration } from "@/components/header-provider";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import siteConfig from "@/site.config";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronUp, FileText, Lightbulb } from "lucide-react";
import { PromptInputArea } from "./-ui.prompt-input-area";

export const Route = createFileRoute("/_app/_authenticated/dashboard/_layout/")(
	{
		component: RouteComponent,
		beforeLoad: () => ({
			title: `${siteConfig.siteTitle} - Dashboard`,
		}),
		ssr: true,
	},
);

function RouteComponent() {
	return (
		<>
			<HeaderConfiguration
				headerDescription="Generate quizzes from PDFs or text prompts."
				headerTitle="Quiz Generator"
				isVisible={false}
			/>
			<div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
				<div className="w-full max-w-3xl">
					{/* Upgrade Button */}
					<div className="mb-8 flex justify-center">
						<button
							type="button"
							className={cn(
								buttonVariants({ variant: "outline" }),
								"gap-2 rounded-full border-border bg-card hover:bg-accent",
							)}
						>
							<ChevronUp className="h-4 w-4" />
							Upgrade free plan to full version
						</button>
					</div>

					{/* Logo Placeholder - Replace with actual logo component if available */}
					<div className="mb-8 flex justify-center">
						{/* <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground"> */}
						{/* Placeholder for a logo, e.g., a simple shape or an SVG icon */}
						<Logo className="h-16 w-16" />
						{/* </div> */}
					</div>

					<h1 className="mb-10 text-center text-4xl font-semibold text-foreground sm:text-5xl">
						What can I help you with today?
					</h1>

					<PromptInputArea />

					{/* Example Prompts */}
					<div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
						<ExamplePromptCard
							icon={<Lightbulb className="h-5 w-5 text-primary" />}
							title="Explain Photosynthesis"
							description="Describe the process of photosynthesis."
						/>
						<ExamplePromptCard
							icon={<FileText className="h-5 w-5 text-primary" />}
							title="Compare Solids, Liquids, and Gases"
							description="Compare the properties of solids, liquids, and gases."
						/>
						<ExamplePromptCard
							icon={<BookOpen className="h-5 w-5 text-primary" />}
							title="Explore the Causes of World War I"
							description="Identify the causes that led to World War I."
						/>
					</div>

					{/* Footer Text */}
					<p className="text-center text-sm text-muted-foreground">
						Our AI-driven solution prioritizes your privacy and data security.
						<a
							href="/privacy"
							className="ml-1 font-medium text-foreground hover:underline"
						>
							{" "}
							{/* Changed href to a more appropriate value */}
							Privacy & Corporate AI
						</a>
					</p>
				</div>
			</div>
		</>
	);
}

// Helper component for example prompt cards
interface ExamplePromptCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

function ExamplePromptCard({
	icon,
	title,
	description,
}: ExamplePromptCardProps) {
	return (
		<button
			type="button"
			className="flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md hover:bg-accent/50 active:scale-[0.99]"
		>
			<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
				{icon}
			</div>
			<div className="flex flex-col">
				<h3 className="text-base font-semibold text-foreground">{title}</h3>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</button>
	);
}
