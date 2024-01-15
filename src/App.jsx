import { useState } from "react"
import ProjectsSidebar from "./components/ProjectsSidebar"
import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import SelectedProject from "./components/SelectedProject"

function App() {
	const [projectsState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	})

	function handleAddTask(text) {
		setProjectState(prev => {
			const taskId = Math.random()
			const newTask = {
				text: text,
				projectId: prev.selectedProjectId,
				id: taskId,
			}
			return {
				...prev,

				tasks: [newTask, ...prev.tasks],
			}
		})
	}

	function handleDeleteTask(id) {
		setProjectState(prev => ({
			...prev,

			tasks: prev.tasks.filter(task => task.id !== id),
		}))
	}

	function handleSelectionProject(id) {
		setProjectState(prev => ({
			...prev,
			selectedProjectId: id,
		}))
	}

	function handleStartAddProject() {
		setProjectState(prev => ({
			...prev,
			selectedProjectId: null,
		}))
	}
	function handleCancelAddProject() {
		setProjectState(prev => ({
			...prev,
			selectedProjectId: undefined,
		}))
	}
	function handleAddProject(projectData) {
		const newProject = {
			...projectData,
			id: Math.random(),
		}
		setProjectState(prev => ({
			...prev,
			selectedProjectId: undefined,
			projects: [...prev.projects, newProject],
		}))
	}

	function handleDeleteProject() {
		setProjectState(prev => ({
			...prev,
			selectedProjectId: undefined,
			projects: prev.projects.filter(
				project => project.id !== prev.selectedProjectId
			),
		}))
	}

	const selectedProject = projectsState.projects.find(
		project => project.id === projectsState.selectedProjectId
	)
	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	)

	if (projectsState.selectedProjectId === null) {
		content = (
			<NewProject onCancel={handleCancelAddProject} onAdd={handleAddProject} />
		)
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}

	return (
		<main className=' my-8 h-screen flex gap-8'>
			<ProjectsSidebar
				onSelectProject={handleSelectionProject}
				projects={projectsState.projects}
				onStartAddProject={handleStartAddProject}
				selectedProjectId={projectsState.selectedProjectId}
			/>
			{content}
		</main>
	)
}

export default App
