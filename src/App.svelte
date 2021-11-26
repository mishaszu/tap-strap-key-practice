<script>
    import Pattern from "./Pattern.svelte";
    import keyset from "./store";

    let offsetWidth;
    let offsetHeight;

    $: console.log($keyset.freq);
</script>

<svelte:window on:keydown={(e) => keyset.click(e.code)} />

<nav>
    <h1>Practice tap strap custom key map</h1>
</nav>
<main>
    <div class="tip">
        {#each $keyset.values as rand (rand.item.key)}
            <Pattern config={rand.item} />
        {/each}
    </div>
    <div class="random-gen" bind:offsetWidth bind:offsetHeight>
        {#each $keyset.values as rand, index (rand.item.key)}
            <div
                class="board-item"
                style={`top: ${rand.yAxis(offsetHeight)-10}px;
                left: ${rand.xAxis(offsetWidth)-10}px;
                z-index: ${index + 5}`}
            >
                {rand.item.key}
            </div>
        {/each}
    </div>
</main>

<style>
    nav {
        text-align: center;
        height: 200px;
        width: 100%;
        overflow: hidden;
    }
    main {
        text-align: center;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
        margin: 0px;
        line-height: 200px;
    }

    .tip {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 50px;
    }

    .random-gen {
        position: relative;
        width: 96%;
        margin-top: 2vh;
        margin-left: 2%;
        height: calc(100vh - 5vh - 250px);
    }

    .board-item {
        position: absolute;
        font-size: 4em;
        text-align: center;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: lightyellow;
    }
</style>
