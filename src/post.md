# I'm writing a calculator to help you collect DragonCash from habitats more efficiently

Hi! I'm a software developer and I like to write tools for games in my spare time. I started playing DVW a few days ago and wanted a way to tell how often I have to log in to collect DC from my habitats before it starts going to waste, so I figured I'd write an app for it!

Here's the description from the readme:

---

**Dragon Distribution Calculator** (alternate title: Time is Money) is a live online calculation tool for DragonVale World. Input your dragons and habitats, and Dragon Distribution Calculator will tell you where to place each of your dragons so that your park can collect DragonCash on its own for as long as possible before any habitats must be emptied out.

For the optimal distribution, DDC also tells you:

* The amount of time each habitat will spend collecting DragonCash before it reaches capacity (Active Time)
* The average of these times for all habitats, both unweighted and weighted according to each habitat's maximum DC value
* The maximum amount of time your park can be left alone to collect DC before any is wasted, based on the habitat with the shortest Active Time

Other features:

* Add, remove, and edit dragons and habitats
* Mark dragons as breeding and specify which habitat they're in, to exempt both the dragon and its habitat slot from the calculation
* Multiple ways to save park data:
  * Persists automatically in browser's LocalStorage
  * Export and import from text files
  * User accounts (maybe)
* Designed for phones -- responsive layout, touch-friendly interface

---

I'll be using the [earning rate data from the wiki](http://dragonvaleworld.wikia.com/wiki/Dragon_Earning_Rates) for the calculation. Some of the dragons' individual pages have more infomation than the big chart, and vice versa, but looks like it's still incomplete for a few dragons:

- [Aria](http://dragonvaleworld.wikia.com/wiki/Aria_Dragon#Earning_Rates): Lv. 17 - 20
- [Enchanted Aria](http://dragonvaleworld.wikia.com/wiki/Aria_Dragon#Earning_Rates): Lv. 11 - 20
- [Enchanted Billow](http://dragonvaleworld.wikia.com/wiki/Billow_Dragon#Earning_Rates): Lv. 2 - 20 (can approximate from Wink -- close, but not exact)
- [Enchanted Festive](http://dragonvaleworld.wikia.com/wiki/Festive_Dragon#Earning_Rates): Lv. 16 - 20 (can extrapolate from Gongji)
- [Enchanted Fossil](http://dragonvaleworld.wikia.com/wiki/Fossil_Dragon#Earning_Rates): Lv. 20 (can extrapolate from Foxglow)
- [Enchanted Glade](http://dragonvaleworld.wikia.com/wiki/Glade_Dragon#Earning_Rates): Lv. 12 and 13
- [Enchanted Kaiju](http://dragonvaleworld.wikia.com/wiki/Kaiju_Dragon#Earning_Rates): Lv. 2 - 8, Lv. 10 - 18
- [Enchanted Kraken](http://dragonvaleworld.wikia.com/wiki/Kraken_Dragon#Earning_Rates) (Lv. 2 - 20)
- [Enchanted Lantern](http://dragonvaleworld.wikia.com/wiki/Lantern_Dragon#Earning_Rates) (Lv. 11 - 20)
- [Enchanted Mantle](http://dragonvaleworld.wikia.com/wiki/Mantle_Dragon#Earning_Rates) (Lv. 2 - 20)
- [Enchanted Masquerade](http://dragonvaleworld.wikia.com/wiki/Masquerade_Dragon#Earning_Rates) (Lv. 5 - 20)
- [Enchanted Pisceia](http://dragonvaleworld.wikia.com/wiki/Pisceia_Dragon#Earning_Rates) (Lv. 17 - 20)
- [Enchanted Polar](http://dragonvaleworld.wikia.com/wiki/Polar_Dragon#Earning_Rates) (Lv. 2 - 17, Lv. 19)
- [Enchanted Sumi](http://dragonvaleworld.wikia.com/wiki/Sumi_Dragon#Earning_Rates) (all)
- [Enchanted Tauria](http://dragonvaleworld.wikia.com/wiki/Tauria_Dragon#Earning_Rates) (Lv. 12 - 20)
- [Enchanted Thaw](http://dragonvaleworld.wikia.com/wiki/Thaw_Dragon#Earning_Rates) (all)

I haven't been playing very long and don't have any of these dragons myself, so if anyone would be willing to fill in the gaps, verify what's there, or provide an alternate source, I'd really appreciate it.

If there's a feature you'd like to see, please feel free to suggest it.