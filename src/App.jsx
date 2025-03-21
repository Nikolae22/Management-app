import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {

    const [projectsState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: [],
        tasks: [],
    })

    function handleAddTask(text) {
        setProjectState((prevState) => {
            const taskId = Math.random();
            const newTask = {
                text,
                projectId: prevState.selectedProjectId,
                id: taskId
            };
            return {
                ...prevState,
                tasks: [newTask, ...prevState.tasks]
            }
        })

    }

    function handleDeleteTask(id) {
        setProjectState((prevState) => {
            return {
                ...prevState,
                tasks: prevState.tasks.filter(
                    (tasks) => tasks.id !== id
                ),
            }
        })

    }

    function handelSelectProject(id) {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: id,
            }
        })
    }

    function handelStartAddProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: null,
            }
        });
    }

    function handleAddProject(projectData) {
        setProjectState(prevState => {
            const projectId = Math.random();
            const newProject = {
                ...projectData,
                id: projectId
            }

            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: [
                    ...prevState.projects,
                    newProject
                ]
            }
        })
    }

    function handleCancelAddProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined
            }
        })
    }

    function handleDeleteProject() {
        setProjectState((prevState) => {
            return {
                ...prevState,
                selectedProjectId: undefined,
                projects: prevState.projects.filter(
                    (project) => project.id !== prevState.selectedProjectId
                ),
            }
        })
    }

    const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)


    let content = <SelectedProject project={selectedProject}
                                   onDelete={handleDeleteProject}
                                   onAddTask={handleAddTask}
                                   onDeleteTask={handleDeleteTask}
                                   tasks={projectsState.tasks}
    />

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handelStartAddProject}/>
    }


    return (
        <main className="h-screen my-8 flex gap-8 ">
            <ProjectsSidebar
                onStartAddProject={handelStartAddProject}
                projects={projectsState.projects}
                onSelectProject={handelSelectProject}
                selectedProjectId={projectsState.selectedProjectId}
            />
            {content}
        </main>
    );
}

export default App;

