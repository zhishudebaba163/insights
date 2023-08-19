import { CommandPaletteItem } from 'frappe-ui'
import { ArrowRight } from 'lucide-vue-next'
import { markRaw, reactive } from 'vue'
import { useRouter } from 'vue-router'

const commandPalette = reactive({
	isOpen: false,
	commands: [],
	searchQuery: '',
	open,
	close,
	search,
	select(command) {
		command.action()
		close()
	}
})

function open() {
	commandPalette.isOpen = true
}
function close() {
	commandPalette.isOpen = false
}
function search(searchTerm) {
	return commandPalette.commands.filter((command) => {
		return command.title.toLowerCase().includes(searchTerm.toLowerCase())
	})
}

function initNavigationCommands(commandPalette) {
	const router = useRouter()
	commandPalette.commands = []
	commandPalette.commands.push({
		title: 'Navigation',
		component: markRaw(CommandPaletteItem),
		items: [
			{
				title: 'Query',
				icon: () => <ArrowRight />,
				action: () => router.push('/query'),
			},
			{
				title: 'Dashboard',
				icon: () => <ArrowRight />,
				action: () => router.push('/dashboard'),
			},
			{
				title: 'Data Source',
				icon: () => <ArrowRight />,
				action: () => router.push('/data-source'),
			},
			{
				title: 'Settings',
				icon: () => <ArrowRight />,
				action: () => router.push('/settings'),
			},
		],
	})
}

export default function useCommandPalette() {
	initNavigationCommands(commandPalette)
	return commandPalette
}
