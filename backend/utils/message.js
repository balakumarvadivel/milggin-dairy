// backend/utils/message.js

const sendOrderMessage = async (order, status) => {
  console.log(`Order ${order._id} updated to status: ${status}`);
  // You can later integrate WhatsApp, SMS, or email here
};

module.exports = sendOrderMessage;
