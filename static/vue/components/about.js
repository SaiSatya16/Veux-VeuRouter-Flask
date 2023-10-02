const About =  Vue.component('about', {
    template: `<div>
            <h1>About Us</h1>
                    
            This is the about page !!
            generate 50 words of lorem ipsum placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. 
                </div>`,
        mounted : function(){
        document.title = "About";
    }
});

export default About;