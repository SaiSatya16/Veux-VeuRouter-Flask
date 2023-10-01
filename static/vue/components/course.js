const Course = Vue.component('course', {
    template: `<div>
            <h1>Course</h1>
                    
            This is the Course page for {{ this.$route.params.id }} !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`
});

export default Course;