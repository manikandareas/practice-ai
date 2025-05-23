import { HeaderConfiguration } from "@/components/header-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/_app/_authenticated/dashboard/_layout/leaderboard",
)({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<HeaderConfiguration
				headerTitle="Leaderboard"
				headerDescription="See how you stack up against other users"
			/>
		</>
	);
}
