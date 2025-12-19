// utils/message.js
// Dummy implementation for sending order messages
// TODO: Implement actual messaging (SMS, email, etc.)

const sendOrderMessage = async (orderData, type) => {
  console.log(`Sending ${type} message for order:`, orderData);
  // Simulate async operation
  return Promise.resolve();
};

module.exports = sendOrderMessage;