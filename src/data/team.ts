export interface TeamMember {
  name: string
  course: string
  /** Put the photo in public/team/ using this exact file name. */
  photo: string
}

// Course/section shown on the About page and footer hover card.
// Photos: save each picture in public/team/ with the file name below (square or portrait works best).
export const TEAM: TeamMember[] = [
  { name: "J'rome A. De la Cruz", course: 'BSIT 3-A', photo: '/team/jrome.jpg' },
  { name: 'Carl Malan', course: 'BSIT 3-A', photo: '/team/carl.jpg' },
  { name: 'Josh Celis', course: 'BSIT 3-A', photo: '/team/josh.jpg' },
]
