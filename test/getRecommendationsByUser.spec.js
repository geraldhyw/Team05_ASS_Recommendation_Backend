const { getRecommendationsByUser } = require('../controllers/recommendations')

describe('getRecommendationsByUser', () => {
    test('SUCCESS', async () => {
        const req = {
            params: {
                userID: "1"
            }
          }
      
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }

        await getRecommendationsByUser(req, res)
        const products = res.json.mock.calls[0][0]
        expect(res.status).toHaveBeenCalledWith(200)
        expect(products).toHaveLength(17)
    })
})