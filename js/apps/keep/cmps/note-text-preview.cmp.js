export default {
    props: ['info'],
    template: `
    <section class="note-text">
        <h1> note text preview </h1>
        <p> {{info.txt}}</p>
    </section>
    `
}