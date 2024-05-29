const UserCard = ({
	name,
	username,
	description,
	following,
	followers,
}: {
	name: string;
	username: string;
	description: string;
	following: string;
	followers: string;
}) => (
	<>
		<div className="mb-2">
			<div className="text-base font-semibold leading-none">{name}</div>
			<div className="text-sm font-medium text-neutral-500">@{username}</div>
		</div>
		<div className="mb-2 text-sm">{description}</div>
		<div className="flex gap-x-4">
			<div className="flex gap-x-1">
				<div className="text-sm font-bold leading-none">{following}</div>
				<div className="text-sm leading-none text-neutral-500">Following</div>
			</div>
			<div className="flex gap-x-1">
				<div className="text-sm font-bold leading-none">{followers}</div>
				<div className="text-sm leading-none text-neutral-500">Followers</div>
			</div>
		</div>
	</>
);

export default UserCard;
