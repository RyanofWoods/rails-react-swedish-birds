json.orders @orders do |order|
  json.partial! 'api/beta/shared/names', element: order
end
