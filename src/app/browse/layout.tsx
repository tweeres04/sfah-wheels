import BrowseTabs from './BrowseTabs'

export default function BrowseLayout({ children }) {
	return (
		<>
			<BrowseTabs />
			{children}
		</>
	)
}
