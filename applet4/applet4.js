class StudentList {
    
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderStudentList(this.students, document.getElementById('studentList')); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students, targetContainer) {
        targetContainer.innerHTML = students.map(student => 
            `<button class="btn btn-primary" style="margin-top:15px; 
                                                    width:25rem">
                 ${student.student_name} | Age: ${student.student_age} | Program: ${student.student_program} | Year Level: ${student.student_yearlevel}
            </button><br>`
        ).join('');
    }
 
    bindSearchEvent() {
        const studentSearchBar = document.getElementById('studentSearchBar');
        const studentSearchListContainer = document.getElementById('studentSearchList');

        studentSearchBar.addEventListener('input', () => {
            this.filterStudents(studentSearchBar.value, studentSearchListContainer);
        });

        this.renderStudentList(this.students, studentSearchListContainer);
    }

    filterStudents(query, searchListContainer) {
        const filteredStudents = this.students.filter(student => {
            const searchText = `${student.student_name} ${student.student_age} ${student.student_program} ${student.student_yearlevel}`.toLowerCase();
            return searchText.includes(query.toLowerCase()); 
        });

        const studentsToRender = query ? filteredStudents : this.students;
        this.renderStudentList(studentsToRender, searchListContainer);
    }
}

const studentList = new StudentList('applet4.json');

document.querySelector('form[role="search"]').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = event.target.querySelector('input[type="search"]').value;
    const searchListContainer = document.getElementById('studentSearchList');
    
    studentList.filterStudents(query, searchListContainer);
});