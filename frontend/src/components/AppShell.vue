<template>
	<div class="flex flex-1 overflow-hidden text-base">
		<Sidebar v-if="!hideSidebar" />
		<RouterView v-slot="{ Component }">
			<Suspense>
				<div class="flex flex-1 flex-col overflow-hidden">
					<component :is="Component" :key="$route.fullPath" />
				</div>
				<template #fallback>
					<SuspenseFallback />
				</template>
			</Suspense>
		</RouterView>
	</div>
	<CommandPalette
		v-model:show="commandPalette.isOpen"
		:search-query="commandPalette.searchQuery"
		:groups="commandPalette.commands"
		@select="commandPalette.select"
	/>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import SuspenseFallback from '@/components/SuspenseFallback'
import authStore from '@/stores/authStore'
import settingsStore from '@/stores/settingsStore'
import useCommandPalette from '@/utils/useCommandPalette'
import { CommandPalette } from 'frappe-ui'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const auth = authStore()
const route = useRoute()
const hideSidebar = computed(() => route.meta.hideSidebar || !auth.isLoggedIn)
onMounted(() => auth.isLoggedIn && settingsStore())

const commandPalette = useCommandPalette()
</script>
