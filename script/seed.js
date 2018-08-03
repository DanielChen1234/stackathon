'use strict'

const db = require('../server/db')
const {Park} = require('../server/db/models')

const seedParks = [
  {
    name: 'Riverside Park',
    description: 'This four-mile stretch of land along the Upper West Side is sandwiched between the Hudson River and the undulating curves of Riverside Drive and Riverside Boulevard. With more than 330 acres of green space, Riverside Park is one of the best spots in the city for hanging out: There are at least 14 monuments, plenty of sports complexes (including ball fields and a skate park) and lots of areas that are perfect for exploring.',
    picture: 'https://media.timeout.com/images/100394233/150/113/image.jpg',
    address: '500 W 70th St New York 10069'
  },
  {
    name: 'Brooklyn Bridge Park',
    description: 'This park on the East River offers gorgeous views of the Manhattan skyline and the Brooklyn Bridge, and it contains several playgrounds for youngsters. Wander among the piers and make sure to stop by Jane’s Carousel, a 1922 merry-go-round that\'s housed in an airy, transparent pavilion, designed by French architect Jean Nouvel.',
    picture: 'https://media.timeout.com/images/100112383/150/113/image.jpg',
    address: '334 Furman St Brooklyn 11201'
  },
  {
    name: 'Central Park',
    description: 'For your stroll head to the 38-acre wilderness area on the west side of the park known as the Ramble. The area has a storied history (as a gay cruising spot dating back to the turn of the last century, among other things), and it was even proposed as a recreational area in the mid-\'50s. Thankfully, the winding trails, rocks and streams remain, seemingly waiting to be discovered.',
    picture: 'https://media.timeout.com/images/100112571/150/113/image.jpg',
    address: '59th Street New York 10023'
  },
  {
    name: 'Fort Greene Park',
    description: 'Both Brooklyn\'s first park and one of it\'s loveliest, this 30-acre parcel has a long association with creative types: It was designed by Frederick Law Olmsted and Calvert Vaux, and architect Stanford White created its towering Prison Ships Martyrs Monument.',
    picture: 'https://media.timeout.com/images/100314353/150/113/image.jpg',
    address: 'Washington Park & St Edward St Brooklyn 11205'
  },
  {
    name: 'Flushing Meadows-Corona Park',
    description: 'Most Manhattanites venture out to these parts only to catch a Mets game or tennis at the U.S. Open, but visitors will also be enticed by the 1964-1965 World’s Fair sculptures, particularly the iconic 140-foot-high Unisphere, a mammoth steel globe that was the fair’s symbol (and site of the apocalyptic battle scene between humans and aliens in the first Men in Black movie). Also visible are the remnants of the New York State Pavilion, erected by Philip Johnson for the fair. Measuring 350 feet by 250 feet, this now-eerie plaza is bordered by 16 100-foot steel columns.',
    picture: 'https://media.timeout.com/images/100208101/150/113/image.jpg',
    address: 'Grand Central Pkwy to Van Wyck Expwy between Roosevelt Ave and Robinson Pkwy Queens 11375'
  },
  {
    name: 'The High Line',
    description: 'Opened in 2009, this highly anticipated outdoor park sits on the elevated infrastructure built on Manhattan\'s West Side in the 1930s. Today, sumptuous gardens and outdoor sculpture adorn this magnificent walkway, which is also an excellent place to enjoy a view of the Hudson River.',
    picture: 'https://media.timeout.com/images/100186353/150/113/image.jpg',
    address: 'Washington St at Gansevoort St New York 10011'
  },
  {
    name: 'Inwood Hill Park',
    description: 'There’s a unique reward for trekking to the northernmost corner of Manhattan, where you’ll find enormous trees in the island’s last virgin forest. Much of the park has never been developed; due to its comparatively remote location, the land remained rural up until its 1916 purchase by the Parks Department, who decided to leave Inwood as natural as possible. As a result, the area remains very similar to the way the island was 500 years ago.',
    picture: 'https://media.timeout.com/images/100315439/750/422/image.jpg',
    address: 'Indian Rd at 218th St New York 10034'
  },
  {
    name: 'Jamaica Bay Wildlife Refuge',
    description: 'This refuge covers more than 9,000 acres, and is the home to some 300 species of birds, making it one of the best bird-watching areas in the city. There are many trails, and the park offers kayaking and walking tours.',
    picture: 'https://media.timeout.com/images/100724391/750/422/image.jpg',
    address: '304 Cross Bay Blvd Queens 11693'
  },
  {
    name: 'Prospect Park',
    description: 'Urban visionaries Frederick Law Olmsted and Calvert Vaux, who most famously designed Central Park, also put their stamp on bucolic Prospect Park. Amenities like the Long Meadow and Nethermead offer plenty of space to pull up on a patch of grass and indulge in some people-watching, and the woodland expanse of the Ravine is a towering forest within bustling Brooklyn.',
    picture: 'https://media.timeout.com/images/100162801/150/113/image.jpg',
    address: 'Prospect Park West to Washington Ave between Prospect Park Southwest and Eastern Pkwy Brooklyn 11215'
  },
  {
    name: 'Van Cortlandt Park',
    description: 'While many visitors are drawn to the city\'s fourth-largest park for the barbecuing and ball-playing, its terrific nature trails, just waiting to be traversed, are the real draw. Van Cortlandt\'s five mile-long routes are full of pristine natural beauty: Varying in difficulty from easy to moderate, the trails cross more than 500 acres of marshland and lush forests of towering oaks and maples, part of its protected nature preserve. History buffs can take a leisurely one-mile stroll along the Old Croton Aqueduct trail, tracing the partial path of the city\'s first water tunnel, which provided New Yorkers with clean drinking water from 1842 to 1897.',
    picture: 'https://media.timeout.com/images/100323111/150/113/image.jpg',
    address: 'Broadway at Van Cortlandt Park South Bronx 10462'
  }
]

const seeder = async () => {
console.log('this is the top')
try {
  console.log('seeding');
  await db.sync({force: true})
  const createParks = await Park.bulkCreate(seedParks, {
  returning: true
  })
  Promise.all([createParks])
} catch (err) {
  console.error(err)
} finally {
  console.log('shutting')
  db.close()
  }
}

seeder()