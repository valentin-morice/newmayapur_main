import mailchimp from "@mailchimp/mailchimp_marketing";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  mailchimp.setConfig({
    apiKey: config.mailchimpKey,
    server: config.mailchimpServer,
  });

  const body = await readBody(event);

  const listId = "ac2862c58b";
  const subscribingUser = {
    email: body.email,
  };

  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
  });

  return {
    status: 200,
  };
});
