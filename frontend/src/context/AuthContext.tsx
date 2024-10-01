	import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
	import toast from "react-hot-toast";

	type AuthUserType = {
		id: string;
		fullname: string;
		email: string;
		profilePic: string;
		gender: string;
	};

	const AuthContext = createContext<{
		authUser: AuthUserType | null;
		setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
		isLoading: boolean;
	}>({
		authUser: null,
		setAuthUser: () => {},
		isLoading: true,
	});

	// Custom hook for using the auth context
	export const useAuthContext = () => {
		return useContext(AuthContext);
	};

	// Provider component for auth context
	export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
		const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
		const [isLoading, setIsLoading] = useState(true);

		useEffect(() => {
			const fetchAuthUser = async () => {
				try {
						const res = await fetch("/api/auth/me");
						if (!res.ok) {
								const errorText = await res.text(); // Get the raw text if not OK
								console.error('Error response:', errorText); // Log the raw error response
								throw new Error(errorText || "Failed to fetch user data");
						}
		
						// Check for empty response
						const text = await res.text();
						if (!text) {
								throw new Error("Received empty response from server");
						}
		
						const data: AuthUserType = JSON.parse(text);
						if (!data || !data.id) {
								throw new Error("Invalid user data received");
						}
		
						setAuthUser(data);
				} catch (error: any) {
						console.error("Error fetching user:", error);
						toast.error(error.message || "An error occurred while fetching user data");
				} finally {
						setIsLoading(false); // Ensure loading state is updated
				}
		};
		

			fetchAuthUser();
		}, []);

		return (
			<AuthContext.Provider
				value={{
					authUser,
					isLoading,
					setAuthUser,
				}}
			>
				{children}
			</AuthContext.Provider>
		);
	};
