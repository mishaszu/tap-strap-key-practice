<script>
    export let config;
</script>

<div class="pattern">
    {#if config.repeat > 1}
        <p>{config.repeat} x</p>
    {/if}
    <div class="dots">
        {#each config.value as dot, index (index)}
            <div class="dot" class:filled={dot === 1} />
        {/each}
    </div>
</div>

<style>
    .pattern, .dots {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .pattern p {
        font-size: 1.4em;
        margin-right: 20px;
    }

    .dot {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid lightblue;
    }

    .dots .dot:nth-child(1) {
        margin-right: 20px;
    }

    .filled {
        background-color: lightblue;
    }
</style>
