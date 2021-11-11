export default {
    props: ['url'],
    template: `
    <section >
        <iframe width="200" height="150" :src="url" title="fff" frameborder="1" allow="picture-in-picture" ></iframe>
    </section>
    `,

}