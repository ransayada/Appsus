//TODO change bake to a real image

export default {
    props: ['url', 'title'],
    template: `
    <div class="flex align-center flex-column">
        <h2> {{title}}</h2>
        <img class="note-img" style="width:200px; hight:15px" :src="url"/> 
</div>
    `
}