class Project extends React.Component{
    constructor() {
        super();
        this.state = {
            projects: [
                "Réalisation du projet SUNU",
                "Réécriture de SATIS",
                "Formation en développement mobile avec Vue Native",
                "Réalisation du projet ORKIX"
            ],
            newProject: "",
            showError: false,
        };
        this.addProject = this.addProject.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const newProject = e.target.value;
        this.setState({ newProject });
    }

    addProject() {
        var showError;
        if (this.state.newProject.length !== 0) {
            const newProject = "";
            showError = false;
            var projects = this.state.projects;
            projects.push(this.state.newProject);
            this.setState({ projects, newProject, showError })
        } else {
            showError = true;
            this.setState({ showError })
        }
    }

    render() {
        const error = <p style={{color: "red"}}><strong>Champ vide</strong></p>;
        const allProject = (project, index) => <li key={index}>{ project }</li>;
        return (
            <div>
                <h1>All projects</h1>
                <ul>
                    { this.state.projects.map(allProject) }
                </ul>
                <br />
                <input type="text" value={this.state.newProject} onChange={this.onChange} />
                <button onClick={this.addProject}>Add Project</button>
                { this.state.showError ? error : "" }
            </div>
        );
    }
}

ReactDOM.render(<Project/>, document.getElementById("root"));