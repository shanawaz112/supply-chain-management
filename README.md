Supply Chain Management

Installation

Instructions on how to install and set up the project.

# Clone the repository

git clone https://github.com/shanawaz112/supply-chain-management.git

# Navigate to the project directory

cd supply-chain-management

# Install dependencies

npm install

# Set up environment variables

cp .env.example .env

Environment Variables

Create a .env file in the root of your project and add the following variables:
    • PORT=
    • MONGODB_URI=
    • JWT_SECRET=
These environment variables are privately shared.

# Make sure to fill in the required values in the .env file

# Start the server

npm start

License

This project is licensed under the MIT License - see the LICENSE file for details.

Contact

    •	Name: Mohammad Shanawaz
    •	Email: shanawaz170589@gmail.com
    •	GitHub: shanawaz112

Usage

Instructions on how to use the project.

    1.	Start the server by running npm start.
    2.	Access the GraphQL playground at http://localhost:4000/graphql (if playground is enabled).
    3.	To use the application, you need to sign up or log in.

Sign Up

To sign up, make a POST request to the /auth/signup endpoint with the following JSON payload:
{
"username": "your_username",
"password": "your_password"
}

Log In

To log in, make a POST request to the /auth/login endpoint with the following JSON payload:
{
"username": "your_username",
"password": "your_password"
}

Upon successful login, you will receive a JWT token which you need to include in the Authorization header of your subsequent requests to access protected routes.

Including the Token

For protected routes, including all GraphQL queries and mutations, you need to include the JWT token in the Authorization header.

Example header:
authorization: YOUR_JWT_TOKEN

GraphQL API Usage

Queries

Get All Inventory Items

query {
inventoryItems {
id
name
sku
quantity
warehouse
supplier {
id
name
}
}
}

Get Inventory Item by ID

query {
inventoryItem(id: "inventory_item_id") {
id
name
sku
quantity
warehouse
supplier {
id
name
}
}
}

Get All Shipments

query {
shipments {
id
origin
destination
status
estimatedDelivery
inventoryItems {
quantity
inventoryItem {
id
name
}
}
}
}

Get Shipment by ID

query {
shipment(id: "shipment_id") {
id
origin
destination
status
estimatedDelivery
inventoryItems {
quantity
inventoryItem {
id
name
}
}
}
}

Get All Suppliers

query {
suppliers {
id
name
contactPerson
phone
email
}
}

Get Supplier by ID

query {
supplier(id: "supplier_id") {
id
name
contactPerson
phone
email
}
}

Mutations

Add Supplier

mutation {
addSupplier(
name: "Supplier Name",
contactPerson: "Contact Person",
phone: "123-456-7890",
email: "supplier@example.com"
) {
id
name
contactPerson
phone
email
}
}

Update Supplier

mutation {
updateSupplier(
id: "supplier_id",
name: "Updated Supplier Name",
contactPerson: "Updated Contact Person",
phone: "987-654-3210",
email: "updated_supplier@example.com"
) {
id
name
contactPerson
phone
email
}
}

Delete Supplier

mutation {
deleteSupplier(id: "supplier_id") {
id
name
}
}

Add Inventory Item

mutation {
addInventoryItem(
name: "Item Name",
sku: "ITEMSKU123",
quantity: 100,
warehouse: "Warehouse A",
supplierId: "supplier_id"
) {
id
name
sku
quantity
warehouse
supplier {
id
name
}
}
}

Update Inventory Item

mutation {
updateInventoryItem(
id: "inventory_item_id",
name: "Updated Item Name",
sku: "UPDATEDSKU123",
quantity: 150,
warehouse: "Updated Warehouse",
supplierId: "updated_supplier_id"
) {
id
name
sku
quantity
warehouse
supplier {
id
name
}
}
}

Delete Inventory Item

mutation {
deleteInventoryItem(id: "inventory_item_id") {
id
name
}
}

Add Shipment

mutation {
addShipment(
origin: "Origin Location",
destination: "Destination Location",
estimatedDelivery: "2024-12-31",
inventoryItems: [
{ inventoryItem: "inventory_item_id", quantity: 50 }
]
) {
id
origin
destination
status
estimatedDelivery
inventoryItems {
quantity
inventoryItem {
id
name
}
}
}
}

Update Shipment

mutation {
updateShipment(
id: "shipment_id",
origin: "Updated Origin",
destination: "Updated Destination",
estimatedDelivery: "2024-12-31",
inventoryItems: [
{ inventoryItem: "updated_inventory_item_id", quantity: 75 }
]
) {
id
origin
destination
status
estimatedDelivery
inventoryItems {
quantity
inventoryItem {
id
name
}
}
}
}

Update Shipment Status

mutation {
updateShipmentStatus(id: "shipment_id", status: "in-transit") {
id
origin
destination
status
estimatedDelivery
}
}

Delete Shipment

mutation {
deleteShipment(id: "shipment_id") {
id
origin
}
}
