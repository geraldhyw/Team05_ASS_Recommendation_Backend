const { addViewByUser } = require('../controllers/recommendations')

describe('addViewByUser', () => {
    test('SUCCESS - no user action', async () => {
        const req = {
            params: {
                userID: 1,
                productID: 1
            }
          }
      
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        await addViewByUser(req, res)
        const result = res.json.mock.calls[0][0]
        expect(res.status).toHaveBeenCalledWith(200)
        expect(result.message).toEqual('View action added successfully!')
    })
})