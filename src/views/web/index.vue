<template>
    <div>
        <button popovertarget="imgBook">点击显示图片</button>
        <img id="imgBook" popover src="/images/cat.png" />

        <div class="ui-select">
            <button id="button" class="ui-select-button" popovertarget="select">
                <span class="ui-select-text">请选择</span>
            </button>
            <menu id="select" popover class="ui-select-datalist">
                <li class="ui-select-datalist-li">
                    <input type="radio" name="type" value="" />请选择
                </li>
                <li class="ui-select-datalist-li">
                    <input type="radio" name="type" value="1" />选项1
                </li>
                <li class="ui-select-datalist-li">
                    <input type="radio" name="type" value="2" />选项2
                </li>
                <li class="ui-select-datalist-li">
                    <input type="radio" name="type" value="3" disabled />选项3
                </li>
                <li class="ui-select-datalist-li">
                    <input type="radio" name="type" value="4" />选项4
                </li>
            </menu>
        </div>
    </div>
</template>
<style>
.ui-select-button {
    min-width: 80px;
    position: relative;
    text-align: start;
	box-sizing: content-box;
	font-size: 100%;
}
.ui-select-button:has(+ :popover-open) {
    border-color: var(--ui-blue, #2a80eb);
    border-radius: var(--ui-radius, 4px) var(--ui-radius, 4px) 0 0;
}
.ui-select-datalist {  
    bottom: auto;
    right: auto;
    left: -999px;
    top: -999px;
}
.ui-select-datalist:popover-open {
    display: block;
    left: calc(var(--left) * 1px);
    top: calc(var(--top) * 1px - 1px);
    width: calc(var(--width) * 1px);
}
.ui-select-datalist-li {
    position: relative;
}
.ui-select-datalist-li:has(:enabled) {
    cursor: pointer;
}
.ui-select-datalist-li:has(:enabled:not(:checked)):hover {
    color: var(--ui-dark, #4c5161);
    background-color: var(--ui-list-hover, #f0f7ff);
}
.ui-select-datalist-li [type="radio"] {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: inherit;
}
.ui-select-datalist-li:has(:checked) {
    background-color: var(--ui-list-selected, #e0f0ff);
}
.ui-select-datalist-li:has(:disabled) {
    opacity: var(--ui-opacity, .4);
    cursor: default;
}

</style>

<script setup>

</script>
