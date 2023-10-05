const { expect } = require("chai")
const { ethers } = require("hardhat")


const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Dappazon", () => {
  let dappazon=null;
  let deployer,buyer;
  beforeEach(async()=>{
    [deployer,buyer]=await ethers.getSigners()
    const Dappazon = await ethers.getContractFactory("Dappazon");
    dappazon = await Dappazon.deploy()
    })
  describe("Deployment",()=>{
    it("Sets the owner",async()=>{
      expect(await dappazon.owner()).to.equal(deployer.address)
    }) 
  })

  describe("Listing",()=>{

  const ID=1     
  const NAME = "Shoes"      
  const CATEGORY = "Clothing"  
  const IMAGE = "C:\Users\kerem\Desktop\dappazon\src\assets\items\shoes.jpg"  
  const COST = tokens(1)
  const RATING = 4
  const STOCK = 5      
    

    let transaction
    beforeEach(async ()=>{
      transaction=await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait()
    })
    it("Return items attributes",async()=>{
      const item= await dappazon.items(1)
      expect(item.id).to.equal(1)
      expect(item.image).to.equal(IMAGE)
    }) 

    it("Emits list event",()=>{
      expect(transaction).to.emit(dappazon,"List")
    })
  })

  describe("Buying", () => {
    let transaction

    beforeEach(async () => {
      // List a item
      transaction = await dappazon.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      await transaction.wait()

      // Buy a item
      transaction = await dappazon.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()
    })


    it("Updates buyer's order count", async () => {
      const result = await dappazon.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it("Adds the order", async () => {
      const order = await dappazon.orders(buyer.address, 1)

      expect(order.time).to.be.greaterThan(0)
      expect(order.item.name).to.equal(NAME)
    })

    it("Updates the contract balance", async () => {
      const result = await ethers.provider.getBalance(dappazon.address)
      expect(result).to.equal(COST)
    })

    it("Emits Buy event", () => {
      expect(transaction).to.emit(dappazon, "Buy")
    })
  })


});