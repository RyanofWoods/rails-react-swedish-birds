module ApiTestHelpers
  def json_response
    JSON.parse(response.body)
  end

  def assert_serialized_array(expected, actual, contextual_attribute)
    simplified_actual = actual.map { |object| object[contextual_attribute] }

    expected.each do |expected_object|
      simplified_expected = expected_object[contextual_attribute]
      assert_includes(simplified_actual, simplified_expected)
      actual_object = actual.find { |object| object[contextual_attribute] == simplified_expected }
      assert_equal(expected_object, actual_object)
    end
  end
end
