import ProjectsSidebar from "./components/ProjectsSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import {useState} from "react";

function App() {

    const [projectsState, setProjectState] = useState({
        selectedProjectId: undefined,
        projects: []
    })

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
            const newProject = {
                ...projectData,
                id: Math.random()
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


    let content;

    if (projectsState.selectedProjectId === null) {
        content = <NewProject onAdd={handleAddProject}/>
    } else if (projectsState.selectedProjectId === undefined) {
        content = <NoProjectSelected onStartAddProject={handelStartAddProject}/>
    }


    return (
        <main className="h-screen my-8 flex gap-8 ">
            <ProjectsSidebar
                onStartAddProject={handelStartAddProject}
                projects={projectsState.projects}/>
            {content}
        </main>
    );
}

export default App;

