<template>
<transition name="dragon-transition">
<li class="dragon-holder">
  
  <div class="dragon">
    <div class="icon"></div>
    <div class="name">{{ name }}</div>
    <div class="species">{{ speciesName(species) }}</div>
    <div class="level">Lv. {{ level }}</div>
    <div class="dcph">{{ dcph }}/h</div>
  </div>
  
  <a class="remove" @click="removeDragon"></a>
</li> 
</transition>
</template>

<script>
import { getSpeciesName, getDcph, DEBUG } from './utils'

export default {
  name: 'dragon',
  props: [ 'id' ],
  data () {
    return {
      origId: this.id,
    }
  },
  computed: {

    /* mutable properties fetched from state */
    
    // string
    name: {
      get () { 
        this.debug("[computed] name: get")
        return this.get("name") 
      },
      set (val) { 
        this.debug("[computed] name: set")
        this.set("name", val) 
      }
    },
    // integer representing the species of dragon 
    species: {
      get () { 
        this.debug("[computed] species: get")
        return this.get("species") 
      },
      set (val) { 
        this.debug("[computed] species: set")
        this.set("species", val) 
      }
    },
    // integer representing the dragon's level
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
    // id of the habitat the dragon is whereBreeding in (default null)
    whereBreeding: {
      get () { 
        this.debug("[computed] whereBreeding: get")
        return this.get("whereBreeding") 
      },
      set (val) { 
        this.debug("[computed] whereBreeding: set")
        this.set("whereBreeding", val) 
      }
    },
    
    /* computed properties relying on functions stored in utils.js */
    
    dcph () {
      this.debug("[computed] dcph")
      return getDcph(this.species)
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
      return this.$store.state.dragons[this.id][prop]
    },
    
    set (key, value) {
      this.debug("[methods] set: " + key + ", " + value)
      this.$store.dispatch('edit', {
        id: this.id,
        key: key,
        value: value
      })
    },
    
    speciesName (speciesId) {
      return getSpeciesName(speciesId)
    },
    
    removeDragon (event) {
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

.dragon-transition-enter {
  opacity: 0;
}

.dragon-transition-leave-active {
  opacity: 0;
}

.dragon-transition-enter .dragon,
.dragon-transition-leave-active .dragon {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}

.dragon-transition {
  transition: all .2s ease;
}

.dragon, .dragons-header {
  display: block;
  width: 680px;
  overflow: hidden;
  margin: 5px auto;
  box-shadow: 0 1px 1px #eee;
  position: relative;
  border-radius: 5px;
  transition: all .3s ease;
}

.dragon {
  border: 1px solid #ccc;
}

.dragon:nth-child(2n + 1) {
  background-color: #fcfcfc;
}

.active-dragon .dragon {
  border-color: #54de9b !important;
  box-shadow: 0 0 3px #54de9b;
}

.active-dragon .dragon div {
  border-color: #bff3da !important;
}

.dragon div, .dragons-header div {
  display: inline-block;
  padding: 1px;
  float: left;
  height: 50px;
  line-height: 50px;
}

.dragons-header div {
  border: 1px solid #ccc;
  background-color: #fcfcfc;
  box-shadow: inset -1px -1px 0 #eaeaea, inset 1px 1px 0 #fff;
  cursor: pointer;
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #eee;
  border-right: none;
}

.dragons-header div:first-child {
  border-radius: 5px 0 0 5px;
}

.dragons-header div:hover + div {
  border-left: 1px solid #aaa;
}

.dragons-header div:last-child {
  border-radius: 0 5px 5px 0;
  border-right: 1px solid #ccc;
}

.dragons-header div:hover {
  background-color: #fefefe;
  color: #000;
  border-color: #aaa;
}

.dragons-header div:after {
  /* styling */ 
  width: 0;
  height: 5px;
  display: inline-block;
  content: " ";
  margin-left: 0;
  vertical-align: middle;
}

.dragons-header div.sort-up:after {
  width: 10px;
  margin-left: 0.5em;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342b983'><polygon points='0,0 100,0 50,50'/></svg>") no-repeat;

  background-position: 0 0;
  background-size: 9px;
  background-repeat: no-repeat;
}

.dragons-header div.sort-down:after {
  width: 10px;
  margin-left: 0.5em;
  margin-bottom: 3px;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%2342b983'><polygon points='0,50 100,50 50,0'/></svg>") no-repeat;

  background-position: 0 calc(50% + 2px);
  background-size: 9px;
  background-repeat: no-repeat;
}

.dragon div {
  border-right: 1px solid #eee;
}

.dragon div.skill2value {
  border-right: none;
}

.dragon-holder {
  position: relative;
  display: block;
  width: 680px;
  margin: 0 auto;
  transition: opacity .2s ease;
}

.remove, .equip-set, .active-dragon-button {
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

.active-dragon-button {
  right: -26px;
  font-size: 18px;
}

.active-dragon-button:before {
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

.dragons-header .skill1, .dragons-header .skill2 {
  width: 29%;
  margin-left: 0;
}

.skill1value, .skill2value {
  width: 8%;
}

.dragons-header .skill1value, .dragons-header .skill2value {
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
