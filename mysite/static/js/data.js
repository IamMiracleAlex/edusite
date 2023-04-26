/* --------------------------------------- */
/*               Testimonials              */
/* --------------------------------------- */
// data
const testimonials = [
  {
    name: "Mosimiloluwa Koye ",
    imgUrl: "./asssets/recruiture-logo-svg.svg",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Senior analyst",
  },
  {
    name: "Kolanle Ademoju",
    imgUrl: "./asssets/home/home-ourservices-image1.png",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Devops engineer",
  },
  {
    name: "Ahmed Kabiru",
    imgUrl: "./asssets/recruiture-logo-svg.svg",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Systems Engineer",
  },
  {
    name: "Alex Chika",
    imgUrl: "./asssets/home/home-ourservices-image1.png",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Web developer",
  },
  {
    name: "Mosimiloluwa Koye Ladele",
    imgUrl: "./asssets/recruiture-logo-svg.svg",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Senior analyst",
  },
  {
    name: "Kolanle Ademoju",
    imgUrl: "./asssets/recruiture-logo-svg.svg",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Devops engineer",
  },
  {
    name: "Ahmed Kabiru",
    imgUrl: "./asssets/home/home-ourservices-image1.png",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Systems Engineer",
  },
  {
    name: "Alex Chika",
    imgUrl: "./asssets/recruiture-logo-svg.svg",
    testimony:
      " Despite graduating with a first class, I struggled to get a job. EduBridge changed my story. ",
    profession: "Web developer",
  },
];

// html
function htmlIndicatorBtn() {
  return `
      <span
 class="cursor-pointer block h-4 w-4 home_testimony_indicator_inactive rounded-full z-20"></span>
    `;
}

function htmlTestimony(testimony) {
  const { name, imgUrl, profession, testimony: text } = testimony;
  return `
         <article
                class="home__testimonycard home_testimonycard_inactive rounded-xl p-5 h-max"
              >
                <q
                  class="line__clamp__4 text-[rgba(11,28,44,0.7)] text-[clamp(1rem,1.2vw,1.2rem)]" text-center leading-[clamp(1.5rem,2vw,3rem)]"
                >
                  ${text}
                </q>

                <div class="flex justify-between items-center space-x-5 mt-5 pt-5 border-t">
                  <span class="h-16 w-16 rounded-full">
                    <img
                      class="rounded-full"
                      src="${imgUrl}"
                      alt="${name}'s picture"
                    />
                  </span>

                  <div class="text-center">
                    <p
                      class="font-semibold text-[var(--color-medium-blue)] text-[clamp(0.75rem,1.25vw,1rem)]"
                    >
                     ${name}
                    </p>
                    <small
                      class="text-[#5D646C] font-medium italic text-[var(--color-medium-blue)]"
                    >
                      ${profession}
                    </small>
                  </div>
                </div>
              </article>
    `;
}

export { testimonials, htmlTestimony, htmlIndicatorBtn };
