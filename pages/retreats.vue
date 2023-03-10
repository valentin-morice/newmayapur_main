<template>
  <div class="bg-base-200 py-28 lg:px-16">
    <div
      class="grid grid-rows-1 lg:grid-cols-2 px-4 lg:px-20 items-center gap-x-4"
    >
      <div class="order-2 lg:order-1 md:px-24 lg:px-0">
        <h2 class="text-xl uppercase font-bold">Retreat Center</h2>
        <p class="pt-3">
          New Mayapur is situated in a haven of peace, amongst the forests and
          fields of Indre, in the center of France. What better setting to take
          a break from the hustle and bustle of your everyday life? We organize
          regular events centered around the discovery and practice of yoga and
          its adjacent culture, be it ahimsa cooking, a natural lifestyle, or
          study of spirituality.
        </p>
      </div>
      <img
        class="order-1 lg:max-w-lg max-w-xs md:max-w-md lg:order-2 mb-12 lg:mb-0 md:mb-24 lg:ml-auto lg:mr-0 mx-auto rounded-lg"
        src="/img/meditation.jpg"
      />
    </div>
  </div>
  <div class="pb-32 pt-28 lg:px-10 lg:w-[1000px] mx-auto">
    <h2 class="text-2xl font-bold text-center mb-12">Our Events</h2>
    <div
      class="flex flex-col mx-4 md:flex-row gap-4 items-center justify-center mb-16"
    >
      <img class="md:h-[245px] rounded-xl" src="/img/yoga.jpg" />
      <img class="md:h-[245px] rounded-xl" src="/img/food.jpg" />
    </div>
    <div class="mx-4">
      <div
        tabindex="0"
        class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
      >
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">Open House Sundays</div>
        <div class="collapse-content">
          <p>
            Come and visit us every Sunday for our open days! Join us for a
            short and sweet program, starting at 11am and ending at 3pm. You'll
            discover the castle and its domain, meet our cows, participate in
            kirtan and much more. A full vegetarian meal is offered at 2pm for
            all of our guests. Everything is free, but a donation is always
            appreciated!
          </p>
        </div>
      </div>
      <div
        tabindex="0"
        class="collapse collapse-plus border mt-4 border-base-300 bg-base-100 rounded-box"
      >
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">Immersion Weekends</div>
        <div class="collapse-content">
          <p>
            Our immersion weekends are a great way to get a head start on
            <i>vaisnava</i> traditions and culture. Spanning over the course of
            two days, those weekends are an introduction to the practice of
            timeless spiritual wisdom, and to show its relevance up to this day.
            You'll be hosted in our comfortable guest-house and provided with
            three delicious meals a day, and will have a great opportunity to
            meet like-minded individuals interested in making their lives more
            meaningful.
          </p>
        </div>
      </div>
      <div
        tabindex="0"
        class="collapse collapse-plus mt-4 border border-base-300 bg-base-100 rounded-box"
      >
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">Full Retreats</div>
        <div class="collapse-content">
          <p>
            Full retreats are dedicated to specific topics (such as
            <i>ayurveda</i> or <i>hatha-yoga</i>, for example), last for a
            minimum of four days, and are a great way to take a deeper dive into
            the <i>yoga</i> tradition. Meet our team of qualified teachers and
            take part in exciting and engaging classes, amongst beautiful
            surroundings of natural fields and forests.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="mx-auto py-32 pt-8 lg:px-16">
      <div
        class="grid grid-cols-1 lg:grid-cols-4 px-4 lg:px-20 items-center gap-x-4"
      >
        <div class="md:px-24 lg:px-0 lg:col-span-2">
          <div class="p-5 pb-6 mx-auto inline bg-base-200 rounded-xl mb-16">
            <Icon name="ion:calendar-outline" size="28px" />
          </div>
          <h2 class="text-xl uppercase font-bold mt-12">Upcoming Events</h2>
          <p class="pt-3 md:w-3/4">
            Discover the ancient science of yoga in all of its variety. From
            practicing asanas to learning the ancient philosophy of Sanskrit
            texts, or simply getting introduced to our place, we offer a variety
            of events all year round.
          </p>
        </div>
        <div
          v-for="event in events.data"
          class="card mt-6 md:mx-auto lg:mx-0 max-w-sm bg-base-100 shadow-xl"
        >
          <figure>
            <img
              :src="
                config.public.strapiBase +
                event.attributes.Thumbnail.data.attributes.formats.small.url
              "
              class="h-52 w-full object-cover"
              alt="Shoes"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              {{ event.attributes.Title.substr(0, 16) + "..." }}
            </h2>
            <p>{{ event.attributes.Description.substr(0, 65) + "..." }}</p>
            <div class="flex justify-end">
              <NuxtLink
                :to="'events/' + event.id"
                class="btn btn-primary btn-outline"
                >Read More</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { find } = useStrapi();

const mail = reactive({ value: "" });
const res = ref("");

const events = await find("events", {
  pagination: {
    pageSize: 2,
    page: 1,
  },
  populate: "Thumbnail",
  sort: ["publishedAt:desc"],
});

const config = useRuntimeConfig();
</script>
