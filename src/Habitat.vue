<template>
<transition name="habitat-transition">
<li class="habitat-holder">
  
  <div class="habitat">
    <div class="icon"></div>
    <div class="type">{{ typeName(type) }}</div>
    <div class="level">Lv. {{ level }}</div>
    <div class="capacity">{{ capacity }}</div>
  </div>
  
  <a class="remove" @click="removeHabitat"></a>
</li> 
</transition>
</template>

<script>
import { getHabitatName, getCapacity, DEBUG } from './utils'

export default {
  name: 'habitat',
  props: [ 'id' ],
  data () {
    return {
      origId: this.id,
    }
  },
  computed: {

    /* mutable properties fetched from state */
    
    // integer representing the type of habitat 
    type: {
      get () { 
        this.debug("[computed] type: get")
        return this.get("type") 
      },
      set (val) { 
        this.debug("[computed] type: set")
        this.set("type", val) 
      }
    },
    // integer representing the habitat's level
    level: {
      get () { 
        this.debug("[computed] level: get")
        return this.get("level") 
      },
      set (val) { 
        this.debug("[computed] level: set")
        this.set("level", val) 
      }
    },
    // array of dragons breeding inside the habitat (default [])
    // TODO: implement array workarounds from talismans
    whoBreeding: {
      get () { 
        this.debug("[computed] breeding: get")
        return this.get("breeding") 
      },
      set (val) { 
        this.debug("[computed] breeding: set")
        this.set("breeding", val) 
      }
    },
    
    /* computed properties relying on functions stored in utils.js */
    
    dcph () {
      this.debug("[computed] dcph")
      return getDcph(this.type)
    },
    

    // for debugging
    data () {
      if (DEBUG) return this.get("data")
    }
  },

  methods: {
  
    debug (msg) {
      if (DEBUG) console.log(this.id + " " + msg)
    },
  
    get (prop) {
      this.debug("[methods] get: " + prop)
      return this.$store.state.habitats[this.id][prop]
    },
    
    set (key, value) {
      this.debug("[methods] set: " + key + ", " + value)
      this.$store.dispatch('edit', {
        id: this.id,
        key: key,
        value: value
      })
    },
    
    typeName (typeId) {
      return getTypeName(typeId)
    },
    
    removeHabitat (event) {
      this.$emit('remove', this.id)
    },
    
    blur (e) { e.target.blur() }    
  } 
}
</script>

<style>
html, * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.habitat-transition-enter {
  opacity: 0;
}

.habitat-transition-leave-active {
  opacity: 0;
}

.habitat-transition-enter .habitat,
.habitat-transition-leave-active .habitat {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.habitat-transition {
  transition: all .2s ease;
}

.habitat, .habitats-header {
  display: block;
  width: 680px;
  overflow: hidden;
  margin: 5px auto;
  box-shadow: 0 1px 1px #eee;
  position: relative;
  border-radius: 5px;
  transition: all .3s ease;
}

.habitat {
  border: 1px solid #ccc;
}

.habitat:nth-child(2n + 1) {
  background-color: #fcfcfc;
}

.active-habitat .habitat {
  border-color: #54de9b !important;
  box-shadow: 0 0 3px #54de9b;
}

.active-habitat .habitat div {
  border-color: #bff3da !important;
}

.habitat div, .habitats-header div {
  display: inline-block;
  padding: 1px;
  float: left;
  height: 50px;
  line-height: 50px;
}

.habitats-header div {
  border: 1px solid #ccc;
  background-color: #fcfcfc;
  box-shadow: inset -1px -1px 0 #eaeaea, inset 1px 1px 0 #fff;
  cursor: pointer;
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #eee;
  border-right: none;
}

.habitats-header div:first-child {
  border-radius: 5px 0 0 5px;
}

.habitats-header div:hover + div {
  border-left: 1px solid #aaa;
}

.habitats-header div:last-child {
  border-radius: 0 5px 5px 0;
  border-right: 1px solid #ccc;
}

.habitats-header div:hover {
  background-color: #fefefe;
  color: #000;
  border-color: #aaa;
}

.habitats-header div:after {
  /* styling */ 
  width: 0;
  height: 5px;
  display: inline-block;
  content: " ";
  margin-left: 0;
  vertical-align: middle;
}

.habitats-header div.sort-up:after {
  width: 10px;
  margin-left: 0.5em;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342b983'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;

  background-position: 0 0;
  background-size: 9px;
  background-repeat: no-repeat;
}

.habitats-header div.sort-down:after {
  width: 10px;
  margin-left: 0.5em;
  margin-bottom: 3px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342b983'><polygon points='0,50 100,50 50,0'/></svg>") no-repeat;

  background-position: 0 calc(50% + 2px);
  background-size: 9px;
  background-repeat: no-repeat;
}

.habitat div {
  border-right: 1px solid #eee;
}

.habitat div.skill2value {
  border-right: none;
}

.habitat-holder {
  position: relative;
  display: block;
  width: 680px;
  margin: 0 auto;
  transition: opacity .2s ease;
}

.remove, .equip-set, .active-habitat-button {
  position: absolute;
  text-align: center;
  width: 20px;
  height:52px;
  line-height: 52px;
  cursor: pointer;
  top: 0;
}

.remove, .equip-set {
  left: -27px;
  width: 20px;
}

.remove {
  font-size: 20px;
}

.remove:before {
  content: '✖';
  content: '\e802';
  font-family: 'icons';
}

.equip-set {
  font-size: 15px;
  top: 2px;
  color: #797979;
  cursor: help;
}

.active-habitat-button {
  right: -26px;
  font-size: 18px;
}

.active-habitat-button:before {
  content: '\e806';
  font-family: 'icons';
}

.rarity {
  width: 25%;
}

.slots {
  width: 17%;
  position: relative;
}

.skill1, .skill2 {
  width: 21%;
}

.habitats-header .skill1, .habitats-header .skill2 {
  width: 29%;
  margin-left: 0;
}

.skill1value, .skill2value {
  width: 8%;
}

.habitats-header .skill1value, .habitats-header .skill2value {
  display: none;
}

select {
  width: 94%;

  /* styling */
  background-color: #fff;
  display: inline-block;
  font: inherit;
  line-height: 1em;
  padding: 5px 20px 5px 5px;
  border-radius: 5px;
  border: 0;
  

  /* reset */

  margin: 0;      
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#42b983'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;

  background-position: calc(100% - 10px) calc(50% + 2px);
  background-size: 9px;
}

select:hover {
background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='#54de9b'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;
  background-position: calc(100% - 10px) calc(50% + 2px);
  background-size: 9px;
}

.skill1value, .skill2value {
  text-align: left;
  position: relative;
}

.skill1value select, .skill2value select {
  width: 2.6em;
  position: relative;
  left: 50%;
  margin-left: -1.3em;
  padding: 5px 10px 5px 5px;
  
  background-position:
    calc(100% - 5px) calc(50% + 2px);
  background-size: 8px;
}

.minus-slots {
  left: 7px;
}

.plus-slots {
  right: 7px;
}

.plus-slots, .minus-slots {
  position: absolute;
  padding: 2px;
  line-height: 46px;
  cursor: pointer;
}

.slot:before {
  content: "◯";
  font-size: 16px;
}

.slot.filled:before {
  content: "⬤";
  color: #555;
}

</style>
