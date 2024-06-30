import React from "react";
import { Text, View } from "./Themed";

interface LockFallbackProps {}

const LockFallback: React.FC<LockFallbackProps> = () => {
	return (
		<View className="flex flex-col justify-center items-center gap-4 p-2">
			<View className="flex justify-center items-center w-full">
				<View className="relative w-32 h-32">
					<View className="absolute bottom-0 left-0 w-32 h-20 rounded-3xl border-gray-300 border-[10px]"></View>
					<View className="absolute overflow-hidden left-7 w-[72px] h-8">
						<View className="absolute bottom--8 w-[72px] h-16 rounded-full border-gray-300 border-[10px]"></View>
					</View>
					<View className="absolute left-7 top-8 h-6 w-0 border-gray-300 border-[5px]"></View>
					<View className="absolute left-[90px] top-8 h-6 w-0 border-gray-300 border-[5px]"></View>
				</View>
			</View>
			<View className="flex justify-center items-center w-3/5">
				<Text className="">
					Other members' responses will be locked until you answer the
					prompt.
				</Text>
			</View>
		</View>
	);
};

export default LockFallback;
