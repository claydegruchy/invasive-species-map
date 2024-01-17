export const styles = [
    'purpleHeat.point',
    'blueHeat.point',
    'orangeHeat.point',
    'greenHeat.point',
    'green.point',
    'classic.point',
    'purpleYellow.point',
    'fire.point',
    'glacier.point',
    'classic.poly',
    'classic-noborder.poly',
    'purpleYellow.poly',
    'purpleYellow-noborder.poly',
    'green.poly',
    'green2.poly',
    'iNaturalist.poly',
    'purpleWhite.poly',
    'red.poly',
    'blue.marker',
    'orange.marker',
    'outline.poly',
    'scaled.circles'
]

export const randomStyle = () => {
    console.log("random style")
    return styles[Math.floor(Math.random() * styles.length)]
}