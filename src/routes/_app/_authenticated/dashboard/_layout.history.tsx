import { HeaderConfiguration } from "@/components/header-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/_authenticated/dashboard/_layout/history",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<HeaderConfiguration
				headerTitle="History"
				headerDescription="See your past activity and performance"
			/>
		</>
	);
}
