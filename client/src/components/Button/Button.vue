<template>
    <div>
        <button
            :class="`waves-effect waves-light btn-large ${classes} ${color}`"
            :name="name"
            :type="type"
        >
            <slot />
            {{text}}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Button',
    props: {
        classes: String,
        color: String,
        icon: String,
        text: String,
        type: String,
        name: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
