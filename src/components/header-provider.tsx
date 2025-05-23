import React from "react";

export type HeaderProviderState = {
	headerConfig?: {
		headerTitle?: string;
		headerDescription?: string;
	};
	isHeaderVisible?: boolean;
	setIsHeaderVisible?: (isVisible: boolean) => void;
	setHeaderConfig?: (config: HeaderProviderState["headerConfig"]) => void;
};

const HeaderProviderContext = React.createContext<HeaderProviderState>({});

export const HeaderProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [headerConfig, setHeaderConfig] = React.useState<
		HeaderProviderState["headerConfig"]
	>({
		headerTitle: "Dashboard",
		headerDescription: "Manage your Apps and view your usage.",
	});
	const [isHeaderVisible, setIsHeaderVisible] = React.useState(true);

	return (
		<HeaderProviderContext.Provider
			value={{
				headerConfig,
				setHeaderConfig,
				isHeaderVisible,
				setIsHeaderVisible,
			}}
		>
			{children}
		</HeaderProviderContext.Provider>
	);
};

export const useHeader = () => {
	const context = React.use(HeaderProviderContext);
	if (!context) {
		throw new Error("useHeader must be used within a HeaderProvider");
	}
	return context;
};

type HeaderConfigurationProps = {
	headerTitle?: string;
	headerDescription?: string;
	isVisible: boolean;
};
export const HeaderConfiguration: React.FC<HeaderConfigurationProps> = ({
	isVisible = true,
	...props
}: HeaderConfigurationProps) => {
	const { headerConfig, setHeaderConfig, setIsHeaderVisible } = useHeader();

	React.useEffect(() => {
		if (setHeaderConfig) {
			setHeaderConfig({
				headerTitle: props.headerTitle || headerConfig?.headerTitle,
				headerDescription:
					props.headerDescription || headerConfig?.headerDescription,
			});
		}
	}, [props.headerTitle, props.headerDescription, setHeaderConfig]);

	React.useEffect(() => {
		if (setIsHeaderVisible) {
			setIsHeaderVisible(isVisible);
		}
	}, [isVisible, setIsHeaderVisible]);
	// Return null to avoid rendering anything

	return null;
};
