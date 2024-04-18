const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full flex justify-start items-start min-h-[84vh]">
			{children}
		</div>
	)
}

export default ProfileLayout
