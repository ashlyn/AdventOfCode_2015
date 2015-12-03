using System.IO;
using System;
using System.Linq;

public class Day1
{
    public static int CalculateWrappingPaperAmount(int[] dimensions)
    {
        var sides = new int[] { dimensions[0] * dimensions[1], dimensions[0] * dimensions[2], dimensions[1] * dimensions[2] };
        var minSide = sides.Min();
        return (2 * sides.Sum()) + minSide;
    }
    
    public static int[] PresentDimensionsHelper(string present)
    {
        var stringDimensions = present.Split('x');
        int[] dimensions = stringDimensions.Select(d => Convert.ToInt32(d)).ToArray();
        return dimensions;
    }
    
    public static void Main()
    {
        string[] presents = File.ReadAllLines("day2input.txt");
        var totals = presents.Select(t => CalculateWrappingPaperAmount(PresentDimensionsHelper(t)));
        Console.WriteLine(totals.Sum());
    }
}
